import { Button, Typography, DatePicker, Space, InputNumber, message } from 'antd';
import { useState } from 'react';
import axios from 'axios'
import moment from 'moment'

const { Text } = Typography;

export default function NewRecord() {
    let [date, setDate] = useState(moment().format())
    let [studyTime, setStudyTime] = useState(2)
    let [buttonDisabled, setButtonDisabled] = useState(false)

    const onChange = (date) => {
        setDate(date ? date.format() : null)
    }

    const onClick = () => {
        setButtonDisabled(true)
        axios.post('http://localhost:8000/data', {
            date: date,
            study: studyTime
        })
            .then(function () {
                setButtonDisabled(false)
                message.success('Record Saved', 1);

            })
            .catch(function (error) {
                console.log(error);
                setButtonDisabled(false)
                message.error('Error occured, check the console');
            });
    }

    const onInputChange = (value) => {
        setStudyTime(value)
    }

    return (
        <div className="NewRecord">
            <Space direction="vertical">
                <DatePicker onChange={onChange} value={date ? moment(date) : ''} />
            </Space>
            <InputNumber onChange={onInputChange} value={studyTime} />
            <Button type="primary" disabled={buttonDisabled} onClick={onClick}>Add</Button>
            <Text>date :{date} studyTime :{studyTime}</Text>
        </div>
    );
}
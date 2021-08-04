import { useState, useEffect } from 'react';
import { Button, Typography, Space, Table, } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import axios from 'axios'

// import './styles/Home.css'

const { Text } = Typography;

export default function Summary() {
    let [data, setData] = useState([]);
    let [updateParam, setUpdateParam] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/data')
            .then(function (response) {
                let updatedData = response?.data.map(record => {
                    record.key = record.id;
                    return record;
                })
                setData(updatedData)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [updateParam])

    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/data/${id}`)
            .then(function (response) {
                console.log('delte', response)
                setUpdateParam(!updateParam)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Study',
            dataIndex: 'study',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onDelete(record.id)} icon={<DeleteFilled />} />
                </Space>
            ),
        },
    ];
    return (
        <div className="Summary">
            <Text strong>Summary</Text>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

// const initialData = [
//     {
//         key: '1',
//         date: '2021-08-10T18:53:05+05:30',
//         study: 6,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
// ];

// const columns = [
//     {
//         title: 'Date',
//         dataIndex: 'date',
//         render: text => <a>{text}</a>,
//     },
//     {
//         title: 'Study',
//         dataIndex: 'study',
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: tags => (
//             <>
//                 {tags.map(tag => {
//                     let color = tag.length > 5 ? 'geekblue' : 'green';
//                     if (tag === 'loser') {
//                         color = 'volcano';
//                     }
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag.toUpperCase()}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Action',
//         key: 'action',
//         render: (text, record) => (
//             <Space size="middle">
//                 <a>Invite {record.name}</a>
//                 <a>Delete</a>
//             </Space>
//         ),
//     },
// ];
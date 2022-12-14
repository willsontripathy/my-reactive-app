// import express, { Application, NextFunction, Request, Response } from 'express'
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
// app.length

// const data = [
//     {
//         ID: 1,
//         name: "Willson",
//         Gender: 'Male',
//         chkData: [
//             { name: "FP Engagment", selected: true },
//             { name: "AE Engagement", selected: false },
//             { name: "KC Engagment", selected: false }
//         ]
//     },
//     {
//         ID: 2,
//         name: "Nelson",
//         Gender: 'Male',
//         chkData: [
//             { name: "FP Engagment", selected: false },
//             { name: "AE Engagement", selected: false },
//             { name: "KC Engagment", selected: true }
//         ]
//     },
//     {
//         ID: 3,
//         name: "Ramakanta",
//         Gender: 'Male',
//         chkData: [
//             { name: "FP Engagment", selected: false },
//             { name: "AE Engagement", selected: true },
//             { name: "KC Engagment", selected: true }
//         ]
//     },
//     {
//         ID: 4,
//         name: "Jayanti",
//         Gender: 'Female',
//         chkData: [
//             { name: "FP Engagment", selected: false },
//             { name: "AE Engagement", selected: true },
//             { name: "KC Engagment", selected: false }
//         ]
//     }
// ];

const data = [
    {
        ID: 1,
        name: "Willson",
        Gender: 'Male',
        chkData: [
            { productId: 67, name: "FP Engagment", selected: true }
        ]
    },
    {
        ID: 2,
        name: "Nelson",
        Gender: 'Male',
        chkData: [
            { productId: 76, name: "KC Engagment", selected: true }
        ]
    },
    {
        ID: 3,
        name: "Ramakanta",
        Gender: 'Male',
        chkData: [
            { productId:79, name: "AE Engagement", selected: true },
            { productId: 76,name: "KC Engagment", selected: true }
        ]
    },
    {
        ID: 4,
        name: "Jayanti",
        Gender: 'Female',
        chkData: [  
            { productId: 79, name: "AE Engagement", selected: true }
        ]
    }
];
const checkboxesData = [
    {productId: 67, name: "FP Engagment", selected: false },
    {productId: 79, name: "AE Engagement", selected: false },
    {productId: 76, name: "KC Engagment", selected: false }
]

app.get('/employee', (req, res, next) => {
    setTimeout((() => {
        return res.send(data);;
    }), 2000)

});
app.get('/employee/:id', (req, res, next) => {
    data.find(x => x.ID === parseInt(req.params.id))
    res.send(data.find(x => x.ID === parseInt(req.params.id)));
});

app.get('/checkdata', (req, res, next) => {
    // setTimeout((() => {
        res.send(checkboxesData);
    // }), 5000);
});
app.get('/checkdata/:id', (req, res, next) => {
    res.json({data: req.params.id});
})

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});





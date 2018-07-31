const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/tasks');

// 注册schema
const Schema = mongoose.Schema;
const Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

// 添加任务
const Task = mongoose.model('Task');
let task = new Task();
task.project = 'clam';
task.description = 'clam';
task.save(err => {
    if (err) {
        throw err;
    }

    console.log('Task saved.');
});

// 搜索文档
Task.find({
    'project': 'clam'
}, (err, tasks) => {
    if (err) {
        throw err;
    }
    for (const task of tasks) {
        console.log('ID: ' + task._id);
        console.log(task.description);
    }
});

// 更新文档


// 删除文档
mongoose.disconnect();
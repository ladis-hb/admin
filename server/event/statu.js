/* jshint esversion:8 */
const EventEmitter = require("events").EventEmitter;
const IO = require("koa-socket-2");
const CM = require("./util/MongoDB");

const io = new IO();
const cm = new CM();
const event = new EventEmitter();

//存取所有设备devid:[user]
const devsMap = new Map();
//存取所有连接socket user:socket.id
const userMap = new Map();
//存取所有连接socket socket.id:user,方便删除使用
const socketIdMap = new Map();

app.context.event = event;
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
import { UPS, AIR_COOL, POWER, IO, TH } from './data/dev';
import { defaultinfo, defaultwarring, warring, log } from './data/info'
var md5 = require('md5')
let _Users = Users;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let { name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let { page, name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

    //get dev list
    mock.onGet('/dev/all').reply(config => {
      let u1 = UPS.ups1
      let u2 = UPS.ups3
      let c1 = AIR_COOL
      let c2 = AIR_COOL
      let i1 = IO
      let i2 = IO
      let p1 = POWER.power1
      let p3 = POWER.power3
      let t1 = TH

      let d = new Date()
      function getdate() {
        var h = d.getHours()
        var m = d.getMinutes()
        var s = d.getSeconds()
        return `${h}:${m}:${s}`
      }

      u1.date = getdate()
      u2.date = getdate()
      c1.date = getdate()
      c2.date = getdate()
      i1.date = getdate()
      i2.date = getdate()
      p1.date = getdate()
      p3.date = getdate()
      t1.date = getdate()

      var data = {
        ups: [
          {
            name: 'u1',
            devid: md5(634585),
            date: getdate(),
            arg: u1,
            args: []
          },
          {
            name: 'u2',
            devid: md5(3585),
            date: getdate(),
            arg: u2,
            args: []
          }
        ],
        air_cool: [
          {
            name: 'c1',
            devid: md5(54548565),
            date: getdate(),
            arg: c1,
            args: []
          },
          {
            name: 'c2',
            devid: md5(3656525),
            date: getdate(),
            arg: c2,
            args: []
          }
        ],
        io: [
          {
            name: 'i1',
            devid: md5(35512585),
            date: getdate(),
            arg: i1,
            args: []
          },
          {
            name: 'i2',
            devid: md5(358121585),
            date: getdate(),
            arg: i2,
            args: []
          }
        ],
        power: [
          {
            name: 'p1',
            devid: md5(35552585),
            date: getdate(),
            arg: p1,
            args: []
          },
          {
            name: 'p3',
            devid: md5(35885121585),
            date: getdate(),
            arg: p3,
            args: []
          }
        ],
        th: [
          {
            name: 't1',
            devid: md5(35512893585),
            date: getdate(),
            arg: t1,
            args: []
          },
        ]
      }
      return new Promise((res, rej) => {
        res([200, { data: data }])
      })
    });


    //get warring
    mock.onGet('/info/warring').reply(config => {
      var data = defaultwarring()
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: data
        }]);
      });
    });

    //get info
    mock.onGet('/info/info').reply(config => {
      var data = defaultinfo()
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: data
        }]);
      });
    });
  }
};
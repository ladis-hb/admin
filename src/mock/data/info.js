var warring = (id,type,level,info,date)=>{
    return {
        id:id,
        type:type,
        level:level,
        info:info,
        date:date
    }
}

var log = (id,type,info,date) => {
    return {
        id:id,
        type:type,
        info:info,
        date:date
    }
}

var defaultwarring = () =>{
    var d = new Date()
    var json = []
    var f = 0
    for (vari=0;i<100;i++){
        var val = warring(i,"typetest",i+f,'warringinfo',d)
        f = i
        json.unshift(val)
    }
    return json
}

var defaultinfo = () =>{
    var d = new Date()
    var json = []
    for (var i=0;i<1000;i++){
        var val = log(i,"typetest",'testinfo',d)
        json.unshift(val)
    }
    return json
}

export {defaultinfo,defaultwarring,warring,log} 
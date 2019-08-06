const btoa = (passwd)=>{
    var ma = '34.85@354'
    return window.btoa(`${passwd}${ma}`)
}

module.exports = {btoa}
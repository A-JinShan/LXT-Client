
Array.prototype.splitTow = function (){
    let step = Math.ceil(this.length / 2)
    let temp = [...this]
    let left = temp.splice(0,step)
    let right = temp
    return [left,right]
}
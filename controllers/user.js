const axios = require('axios')

exports.getUsers = async () => {
    const fetchUser = await axios.get('http://localhost:3000/users')
    const users = await fetchUser.data
    return users
}

exports.getUser = async (email,password) => {
    const users = await this.getUsers()
    const user = users.find((u) => u.email === email && u.password===password);
    if(user) {
        return user
    } else return null 
}

// this.getUser('salwa@gmail.com').then(u=>console.log(u))


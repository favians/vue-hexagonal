import User from '@@/business/user/user'

export default class UserManagement {
    user : Array<User> = [
        {
            id: '1',
            name: 'user-1',
            username: 'username-1',
            password: 'password-1'
        },
        {
            id: '2',
            name: 'user-2',
            username: 'username-2',
            password: 'password-2'
        },
        {
            id: '3',
            name: 'user-3',
            username: 'username-3',
            password: 'password-3'
        },
        {
            id: '4',
            name: 'user-4',
            username: 'username-4',
            password: 'password-4'
        },
        {
            id: '5',
            name: 'user-5',
            username: 'username-5',
            password: 'password-5'
        },
    ]

    getAllUser(userID: string) : Array<User> {
        if (userID){
            try {
                const idString : number = Number(userID)-1
                let singleArrayUser : Array<User> = []

                singleArrayUser.push(this.user[idString])

                return singleArrayUser

            } catch (error) {
                return this.user
            }
        }

        return this.user
    }

    insertUser(newUser: User) : string {

        const insertUser : User = {
            id: String(this.user.length+1),
            name: newUser.name,
            username: newUser.username,
            password: newUser.password
        }
    
        this.user.push(insertUser)
    
        return "success"
    }

    editUser(newUser: User) : string {
        const index = Number(newUser.id) - 1

        this.user[index] = {
            id: newUser.id,
            name: newUser.name,
            password: newUser.password,
            username: newUser.username,
        }

        return "success"
    }
}

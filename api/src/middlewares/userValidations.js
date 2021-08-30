export const validateUser = async (user) => {

    if(emailValid()){
        const message = verifyPassword(user.password)

        if(message.equals("That password security level is WEAK")){
            return message;
        }else {
            return "OK"
        }

    }else{
        return "That email is not valid"
    }
}

export const emailValid = async (email) => {

    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if(!re.exec(email)){
        return true
    }

}

export const verifyPassword = async (password) => {    

    const medium = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const strong = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/

    if(!medium.exec(password) && !strong.exec(password)) {
        return "That password security level is WEAK"
    }else if(medium.exec(password)){
        return "That password security level is MEDIUM"
    }else if(strong.exec(password)){
        return "That password security level is STRONG"
    }

}
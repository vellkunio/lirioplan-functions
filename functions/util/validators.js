
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}

exports.validateSignupData = (data) => {
    let errors = {};

    if(isEmpty(data.email)){
        errors.email = 'Must not be empty';
    } else if(!isEmail(data.email)){
        errors.email = 'Must be a valid Email';
    }

    if(isEmpty(data.password)) errors.password = 'Must not be empty';
    if(data.password != data.confirmPassword) errors.confirmPassword = 'Passwords must be the same';
    if(isEmpty(data.handle)) errors.handle = 'Must not be empty';
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}

exports.validateLoginData = (data) => {
    let errors = {}

    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}

//Finding for fields that need to be updated and sending them back to projects.js
exports.updateProjectDetails = (data) => {
    let newDetails = {};

    if(data.address != null){
        if (!isEmpty(data.address.trim())) newDetails.address = data.address;
    }

    if(data.bossCompany != null){
        if (!isEmpty(data.bossCompany.trim())) newDetails.bossCompany = data.bossCompany;
    }

    if(data.room != null){
        if (!isEmpty(data.room.trim())) newDetails.room = data.room;
    }

    if(data.size != null){
        newDetails.size = data.size;
    }

    if(data.makeMoney != null){
        newDetails.makeMoney = data.makeMoney;
    }
    
    if(data.spendMoney != null){
        newDetails.spendMoney = data.spendMoney;
    }
    
    if(data.isStarted != null){
        newDetails.isStarted = data.isStarted;
    }
    
    if(data.isFullyPaid != null){
        newDetails.isFullyPaid = data.isFullyPaid;
    }

    if(data.isFinished != null){
        newDetails.isFinished = data.isFinished;
    }

    return newDetails;
}

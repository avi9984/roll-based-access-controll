export const validEmail = (Email:string):boolean => {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(Email)) {
        return false;
    } else {
        return true;
    }
};

export const validPwd = (Password:string):boolean => {
    if (
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
            Password,
        )
    ) {
        return false;
    } else {
        return true;
    }
};

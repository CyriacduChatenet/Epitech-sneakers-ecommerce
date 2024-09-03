import { FC } from "react";

import { SigninForm } from "../../components/auth/signinForm";

const SigninPage: FC = () => {
    return(
        <div>
            <h1>Signin</h1>
            <SigninForm/>
        </div>
    )
}

export default SigninPage;
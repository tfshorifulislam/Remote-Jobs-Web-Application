'use client';

import { useSession } from "../auth-client";

const GetLoginUser = () => {
    const {data: session, isPending} = useSession();
    return {session, isPending};
};

export default GetLoginUser;
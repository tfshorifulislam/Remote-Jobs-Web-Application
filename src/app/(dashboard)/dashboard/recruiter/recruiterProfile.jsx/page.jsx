'use client'
import { useSession } from '@/lib/auth-client';


const RecruiterProfilePage = () => {

    const { data: session, isPending } = useSession()

    if (isPending) {
        retruen(
            <div>Loading...</div>
        )
    }

    const user = session?.user;
    console.log(user, 'user form recruter profile')
    return (
        <div>

        </div>
    );
};

export default RecruiterProfilePage;
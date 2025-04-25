
import { CiLogout } from "react-icons/ci";
import { auth, signIn, signOut } from "../../auth";


export const LogoutButton = async () => {

    const session = await auth();
    console.log('session: ', session);

    if (!session) {
        return (
            <form
                action={async () => {
                    "use server"
                    await signIn();
                }}
            >
                {/* <button type="submit">Sign Out</button> */}
                <button type="submit" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                    <CiLogout />
                    <span className="group-hover:text-gray-700">Login</span>
                </button>
            </form>
        )
    }

    return (

        <form
            action={async () => {
                "use server"
                await signOut();
            }}
        >
            {/* <button type="submit">Sign Out</button> */}
            <button type="submit" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <CiLogout />
                <span className="group-hover:text-gray-700">Logout</span>
            </button>
        </form>
    )



}
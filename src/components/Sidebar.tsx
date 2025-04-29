import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorking, IoListOutline } from "react-icons/io5";
import { auth, signOut } from "../../auth";
import { LogoutButton } from './LogoutButton';


const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline />,
    title: 'Server Actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorking />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline />,
    title: 'Productos',
    path: '/dashboard/products'
  },
]

export const Sidebar = async () => {

  const session = await auth();

  const avatarUrl = (session?.user?.image)
    ? session.user.image
    : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFrlTB2SaQAM5Ahs.jpg%3Alarge&f=1&nofb=1&ipt=85d5341d0c965867d006a4705a84206542e769eb33021079c6adfa7b813e4ede&ipo=images'

  const userName = session?.user?.name ?? 'No Name';
  const userRoles = session?.user?.roles ?? ['no-role'];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            <Image
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.27.ua%2Fsc--media--prod%2Fdefault%2Fd2%2F2c%2F06%2Fd22c06bc-6281-4f87-b153-f5033bfe2bb3.jpg&f=1&nofb=1&ipt=eb6f18f3e31542ca43a2f0f346f24ec741878746825516f3d220391962d8de4b&ipo=images"
              className="w-32"
              alt="tailus logo"
              width={50}
              height={50}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={150}
            height={150}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {
              userRoles.join(',')
            }
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItems.map(item => (
              <SidebarItem key={item.path} {...item} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  )
}

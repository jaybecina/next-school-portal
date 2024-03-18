import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavbarSubMenu = ({ navItemCurrent, navItemName, subMenuData }) => {
  return (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button
            className={classNames(
              navItemCurrent
                ? "text-blue-800"
                : "text-black hover:text-blue-600",
              "iiss-button px-3 py-2 text-sm font-medium border-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            )}
          >
            {navItemName}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -right-34 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
            {subMenuData?.map((item) => (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              </>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default NavbarSubMenu;

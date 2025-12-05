"use client";

import { useUIStore } from "@/stores/useUIStore";
import { Menu, Bell, Settings, Users, LogOut } from "lucide-react";
import { Avatar, Dropdown, Label } from "@heroui/react"; 


export default function AdminHeader() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-3 md:pl-2 md:pr-6 bg-white border-b-1 border-gray-200">
      
      {/* Left: Toggle Button (Visible on ALL screens now) */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Right: User Profile & Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div>
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="flex items-center gap-3 border-l">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-700">Admin User</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                        <Avatar size="sm">
                            <Avatar.Image
                            alt="Small Avatar"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                            />
                            <Avatar.Fallback>SM</Avatar.Fallback>
                        </Avatar>
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Popover className="rounded-xl">
                    <div className="px-3 pb-3 pt-3 border-b-1 border-gray-200">
                        <div className="flex items-center gap-2">
                            <Avatar size="sm">
                                <Avatar.Image
                                    alt="Jane"
                                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                                />
                                <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col gap-0">
                                <p className="text-sm font-medium leading-5 text-gray-700">Jane Doe</p>
                                <p className="text-muted text-xs leading-none text-gray-500">jane@example.com</p>
                            </div>
                        </div>
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item id="dashboard" textValue="Dashboard" className="hover:rounded-sm">
                            <Label className="text-gray-700">Dashboard</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="profile" textValue="Profile" className="hover:rounded-sm">
                            <Label className="text-gray-700">Profile</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="settings" textValue="Settings" className="hover:rounded-sm">
                            <div className="flex w-full items-center justify-between gap-2 text-gray-700">
                                <Label className="text-gray-700">Settings</Label>
                                <Settings className="text-muted size-3.5" />
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item id="new-project" textValue="New project" className="hover:rounded-sm">
                            <div className="flex w-full items-center justify-between gap-2 text-gray-700">
                                <Label className="text-gray-700">Create Team</Label>
                                <Users className="text-muted size-3.5" />
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item id="logout" textValue="Logout" variant="danger" className="hover:rounded-sm">
                            <div className="flex w-full items-center justify-between gap-2">
                                <Label>Log Out</Label>
                            <LogOut className="text-danger size-3.5" />
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div>
      </div>
    </header>
  );
}
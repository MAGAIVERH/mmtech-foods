"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <>
      <div className="flex justify-between px-5 pt-6 ">
        <div className="relative h-[30px] w-[100px] ">
          <Link href="/">
            <Image
              src="/logo-foods.png"
              alt="Logo Foods"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button
              size="icon"
              variant="outline"
              className="bg-transaparent border-none"
            >
              <MenuIcon />
            </Button>

            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              {data?.user ? (
                <>
                  <div className="flex justify-between pt-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={data?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {data?.user?.name?.split(" ")[0][0]}
                          {data?.user?.name?.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{data?.user?.name}</h3>
                        <span className="block text-xs text-muted-foreground">
                          {data?.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between pt-10">
                    <h2 className="font-semibold">Olá, Faça seu login!</h2>
                    <Button size="icon" onClick={handleSignInClick}>
                      <LogInIcon />
                    </Button>
                  </div>
                </>
              )}

              <div className="py-6">
                <Separator />
              </div>

              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="font-nornal w-full justify-start space-x-3 rounded-full text-xs"
                >
                  <HomeIcon size={16} />
                  <span className="block">Inicio</span>
                </Button>

                {data?.user && (
                  <>
                    <Button
                      variant="ghost"
                      className="font-nornal w-full justify-start space-x-3 rounded-full text-xs"
                    >
                      <ScrollTextIcon size={16} />
                      <span className="block">Meus Pedidos</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="font-nornal w-full justify-start space-x-3 rounded-full text-xs"
                    >
                      <HeartIcon size={16} />
                      <span className="block">Restaurantes Favoritos</span>
                    </Button>
                  </>
                )}
              </div>

              <div className="py-6">
                <Separator />
              </div>

              {data?.user && (
                <Button
                  variant="ghost"
                  className="font-nornal w-full justify-start space-x-3 rounded-full text-xs"
                  onClick={handleSignOutClick}
                >
                  <LogOutIcon size={16} />
                  <span className="block">Sair da Conta</span>
                </Button>
              )}
            </SheetContent>
          </SheetTrigger>
        </Sheet>
      </div>
    </>
  );
};

export default Header;

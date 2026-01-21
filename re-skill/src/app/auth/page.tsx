/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { MarqueeDemo } from "./_components/MarqueeLogin";
import { Button } from "@/components/ui/button";
import { AnimatedGradientTextDemo } from "./_components/GradientText";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (provider: "google" | "discord" | "slack_oidc") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          role: "user",
        },
      },
    });

    if (error) {
      console.error("Login error:", error.message);
    }
  };


  return (
    <section className="h-screen overflow-hidden">
      <main className="flex flex-col lg:flex-row h-full">
        {/* LEFT SIDE */}
        <div className="flex-1 min-h-screen lg:min-h-0">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex items-center mb-10 cursor-pointer">
              <Link href="/">
                <Image
                  src="/reskill2.png"
                  alt="logo"
                  width={80}
                  height={80}
                  className=""
                />
              </Link>

              <h1 className="font-raleway text-3xl font-bold">Re:Skill</h1>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                className="font-inter text-sm tracking-wide bg-blue-50 text-black rounded border shadow-sm hover:bg-blue-100 hover:scale-105 hover:border-blue-400 cursor-pointer w-[280px] py-5"
                onClick={() => handleLogin("google")}
              >
                <Image
                  src="/search.png"
                  alt="Google"
                  width={25}
                  height={25}
                  className="mr-5"
                />{" "}
                continue with Google
              </Button>
              <Button
                className="font-inter text-sm tracking-wide bg-blue-50 text-black rounded border shadow-sm  hover:bg-blue-100 hover:scale-105 hover:border-blue-400 cursor-pointer  w-[280px] py-5"
                onClick={() => handleLogin("discord")}
              >
                <Image
                  src="/discord.png"
                  alt="Google"
                  width={25}
                  height={25}
                  className="mr-5"
                />{" "}
                continue with Discord
              </Button>
              <Button
                className="font-inter text-sm tracking-wide bg-blue-50 text-black rounded border shadow-sm  hover:bg-blue-100 hover:scale-105 hover:border-blue-400 cursor-pointer  w-[280px] py-5"
                onClick={() => handleLogin("slack_oidc")}
              >
                <Image
                  src="/slack.png"
                  alt="Google"
                  width={25}
                  height={25}
                  className="mr-5"
                />{" "}
                continue with Slack
              </Button>
            </div>

            <div className="flex flex-col gap-5 w-full max-w-[320px] mx-auto mt-8">
              <p
                onClick={() => router.push("/auth-mentor")}
                className="text-base font-medium text-center cursor-pointer"
              >
                {" "}
                  Are you a Mentor ?{" "}
                <span className="text-blue-500 cursor-pointer">
                  Click here!
                </span>
              </p>
            </div>
          </div>
        </div>
       
        {/* RIGHT SIDE */}
        <div className="hidden lg:flex h-screen w-full lg:w-[55%] bg-blue-700 relative">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `
        radial-gradient(ellipse 80% 60% at 70% 20%, rgba(90, 70, 200, 0.85), transparent 70%),
        radial-gradient(ellipse 70% 60% at 20% 80%, rgba(40, 120, 220, 0.75), transparent 70%),
        radial-gradient(ellipse 65% 55% at 60% 65%, rgba(0, 180, 255, 0.55), transparent 70%),
        radial-gradient(ellipse 65% 40% at 50% 60%, rgba(180, 60, 200, 0.45), transparent 70%),
        linear-gradient(180deg, #0f172a 0%, #1e293b 100%)
      `,
            }}
          />

          <div className="absolute top-[16%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AnimatedGradientTextDemo />
          </div>
          <div className="absolute inset-0 ">
            <Image
              src="/reskill2.png"
              alt="Re-Skill"
              width={100}
              height={100}
              className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ">
            <h1 className="text-[58px] font-bold text-white/70 font-sora tracking-wide text-center leading-tight">
              “Clarity Today, <br /> <span className="">Success Tomorrow.</span>
              ”
            </h1>
          </div>

          <div className="w-[99%] mx-auto absolute bottom-2">
            <MarqueeDemo />
          </div>
        </div>
      </main>
    </section>
  );
}
"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Badge, BrandMark, Button, Card, Field, TextInput } from "./ui";

type LoginRole = "admin" | "judge";

type RoleLoginProps = {
  initialRole?: LoginRole;
};

const demoAccounts = {
  admin: {
    label: "관리자",
    email: "admin@shinsegaeawards.kr",
    password: "password",
    destination: "/admin/dashboard",
    helper: "출품작, 심사위원, 배정, 점수표를 관리합니다."
  },
  judge: {
    label: "심사위원",
    email: "hong@jury.kr",
    password: "password",
    destination: "/judge/evaluation",
    helper: "배정된 출품작을 보고 항목별 평가를 진행합니다."
  }
} as const;

export function RoleLogin({ initialRole = "admin" }: RoleLoginProps) {
  const router = useRouter();
  const [role, setRole] = useState<LoginRole>(initialRole);
  const [email, setEmail] = useState<string>(demoAccounts[initialRole].email);
  const [password, setPassword] = useState<string>(demoAccounts[initialRole].password);

  const account = useMemo(() => demoAccounts[role], [role]);

  function selectRole(nextRole: LoginRole) {
    setRole(nextRole);
    setEmail(demoAccounts[nextRole].email);
    setPassword(demoAccounts[nextRole].password);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem("review-system-role", role);
    window.localStorage.setItem("review-system-email", email);
    router.push(account.destination);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#071936_0%,#15366d_48%,#f4f7fb_48%)] p-5">
      <Card className="w-full max-w-2xl p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <BrandMark />
          <Badge tone={role === "admin" ? "green" : "blue"}>{account.label} 로그인</Badge>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Review System</p>
          <h1 className="mt-2 text-3xl font-bold text-navy-900">신세계스퀘어 미디어아트 어워즈</h1>
          <p className="mt-2 text-sm text-slate-600">하나의 로그인 화면에서 역할을 선택하면 해당 페이지로 이동합니다.</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => selectRole("admin")}
            className={`rounded-lg border p-4 text-left transition ${role === "admin" ? "border-navy-900 bg-navy-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
          >
            <ShieldCheck className="text-navy-700" size={22} />
            <p className="mt-3 font-bold text-navy-900">관리자</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{demoAccounts.admin.helper}</p>
          </button>
          <button
            type="button"
            onClick={() => selectRole("judge")}
            className={`rounded-lg border p-4 text-left transition ${role === "judge" ? "border-navy-900 bg-navy-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
          >
            <UserRoundCheck className="text-navy-700" size={22} />
            <p className="mt-3 font-bold text-navy-900">심사위원</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{demoAccounts.judge.helper}</p>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <Field label="이메일">
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <TextInput className="pl-10" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
          </Field>
          <Field label="비밀번호">
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <TextInput className="pl-10" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
          </Field>
          <Button type="submit" className="w-full">
            {account.label} 페이지로 이동
          </Button>
        </form>

        <div className="mt-5 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-500">
          데모 계정: 관리자 <span className="font-semibold text-slate-700">admin@shinsegaeawards.kr</span> / 심사위원{" "}
          <span className="font-semibold text-slate-700">hong@jury.kr</span>, 비밀번호는 둘 다 <span className="font-semibold text-slate-700">password</span>
        </div>
      </Card>
    </main>
  );
}

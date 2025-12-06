import { Card } from "@heroui/react";

interface StatCardProps {
    title: string;
    icon: React.ReactNode;
    value: string | number;
    analysisvalue: string | number;
    shortdesc: string;
    iconcolor?: string;
}

export default function StatCard({ title, icon, value, analysisvalue, shortdesc, iconcolor}: StatCardProps) {
    return (
        <Card className="rounded-lg">
          <Card.Content>
            <div className="w-full flex gap-2 justify-between">
              <div>
                <div className="text-slate-500 mb-1">{title}</div>
                <div className="text-slate-700 text-2xl font-bold">{value}</div>
              </div>
              <div className={`${iconcolor} rounded-md p-2 h-fit`}>
                {icon}
              </div>
            </div>
            <div className="mt-2 text-slate-500 text-md">
              <span className="text-indigo-500">{analysisvalue}</span> {shortdesc}
            </div>
          </Card.Content>
        </Card>
    );
}
"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  Building,
  Hash,
  Calendar,
  Edit3,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { currentStudent } from "@/lib/data";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: currentStudent.email,
    phone: currentStudent.phone,
  });

  const handleSave = () => {
    setEditing(false);
  };

  const memberSince = new Date(currentStudent.joinDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Profile"
        description="View and manage your student information."
      />

      <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground sm:h-16 sm:w-16 sm:text-xl"
              aria-hidden="true"
            >
              {currentStudent.firstName[0]}
              {currentStudent.lastName[0]}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-serif text-lg font-bold sm:text-xl">
                {currentStudent.firstName} {currentStudent.lastName}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground sm:mt-1">
                {currentStudent.program}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-1.5 sm:justify-start sm:gap-2">
                <Badge className="text-[11px] bg-emerald-100 text-emerald-800 sm:text-xs">
                  {currentStudent.membershipStatus === "active"
                    ? "Active Member"
                    : "Inactive"}
                </Badge>
                <Badge variant="outline" className="text-[11px] sm:text-xs">Level {currentStudent.level}</Badge>
              </div>
            </div>
            <div className="w-full sm:ml-auto sm:w-auto">
              <Button
                variant={editing ? "default" : "outline"}
                onClick={editing ? handleSave : () => setEditing(true)}
                className="w-full gap-2 sm:w-auto"
              >
                {editing ? (
                  <>
                    <Save className="h-4 w-4" strokeWidth={1.75} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4" strokeWidth={1.75} />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        <section
          className="rounded-lg border bg-card p-4 sm:p-6"
          aria-labelledby="personal-heading"
        >
          <h2 id="personal-heading" className="text-base font-semibold sm:text-lg">
            Personal Information
          </h2>
          <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
            <FieldDisplay
              icon={Hash}
              label="Student ID"
              value={currentStudent.studentId}
            />
            <div>
              <label
                htmlFor="email-input"
                className="flex items-center gap-2 text-[13px] text-muted-foreground sm:text-sm"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Email Address
              </label>
              {editing ? (
                <Input
                  id="email-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-sm font-medium sm:text-base">{formData.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone-input"
                className="flex items-center gap-2 text-[13px] text-muted-foreground sm:text-sm"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Phone Number
              </label>
              {editing ? (
                <Input
                  id="phone-input"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-sm font-medium sm:text-base">{formData.phone}</p>
              )}
            </div>
          </div>
        </section>

        <section
          className="rounded-lg border bg-card p-4 sm:p-6"
          aria-labelledby="academic-heading"
        >
          <h2 id="academic-heading" className="text-base font-semibold sm:text-lg">
            Academic Information
          </h2>
          <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
            <FieldDisplay
              icon={GraduationCap}
              label="Program"
              value={currentStudent.program}
            />
            <FieldDisplay
              icon={Building}
              label="Department"
              value={currentStudent.department}
            />
            <FieldDisplay
              label="Level"
              value={`Level ${currentStudent.level}`}
            />
            <FieldDisplay
              icon={Calendar}
              label="Member Since"
              value={memberSince}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function FieldDisplay({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        {Icon && (
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        )}
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

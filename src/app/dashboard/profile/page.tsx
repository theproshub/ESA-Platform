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
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your student information.
        </p>
      </header>

      <div className="mx-auto max-w-2xl space-y-6">
        <section className="rounded-lg border bg-card p-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground"
              aria-hidden="true"
            >
              {currentStudent.firstName[0]}
              {currentStudent.lastName[0]}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-serif text-xl font-bold">
                {currentStudent.firstName} {currentStudent.lastName}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {currentStudent.program}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge className="bg-emerald-100 text-emerald-800">
                  {currentStudent.membershipStatus === "active"
                    ? "Active Member"
                    : "Inactive"}
                </Badge>
                <Badge variant="outline">Level {currentStudent.level}</Badge>
              </div>
            </div>
            <div className="sm:ml-auto">
              <Button
                variant={editing ? "default" : "outline"}
                onClick={editing ? handleSave : () => setEditing(true)}
                className="gap-2"
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
          className="rounded-lg border bg-card p-6"
          aria-labelledby="personal-heading"
        >
          <h2 id="personal-heading" className="text-lg font-semibold">
            Personal Information
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FieldDisplay
              icon={Hash}
              label="Student ID"
              value={currentStudent.studentId}
            />
            <div>
              <label
                htmlFor="email-input"
                className="flex items-center gap-2 text-sm text-muted-foreground"
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
                <p className="mt-1 font-medium">{formData.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone-input"
                className="flex items-center gap-2 text-sm text-muted-foreground"
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
                <p className="mt-1 font-medium">{formData.phone}</p>
              )}
            </div>
          </div>
        </section>

        <section
          className="rounded-lg border bg-card p-6"
          aria-labelledby="academic-heading"
        >
          <h2 id="academic-heading" className="text-lg font-semibold">
            Academic Information
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
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

"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import TeamMemberList from "@/_components/user/dashboard/facilities/edit-form/team-member-list";
import { TeamMember } from "@/_types/facility-types";

interface Props {
  facilitySlug: string;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const MeetTheTeamSection = forwardRef<HTMLDivElement, Props>(
  function MeetTheTeamSection(
    {
      facilitySlug,
      teamMembers,
      setTeamMembers,
      activeSection,
      toggleSection,
      error,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="border border-black rounded-md overflow-hidden scroll-mt-24"
      >
        <button
          type="button"
          onClick={() => toggleSection("meetTheTeam")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", {
                "text-error": error,
              })}
            >
              Meet the Team
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "meetTheTeam" ? "−" : "+"}</span>
        </button>
        {activeSection === "meetTheTeam" && (
          <TeamMemberList
            facilitySlug={facilitySlug}
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
          />
        )}
        <input
          type="hidden"
          name="meetTheTeam"
          value={JSON.stringify(teamMembers)}
        />
      </div>
    );
  },
);

export default MeetTheTeamSection;

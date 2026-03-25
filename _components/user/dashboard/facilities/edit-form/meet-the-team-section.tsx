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
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
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
      onPendingAdd,
      onPendingRemove,
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
              Meet the Team (optional)
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "meetTheTeam" ? "−" : "+"}</span>
        </button>
        {activeSection === "meetTheTeam" && (
          <p className="text-smallest px-4 pb-2">
            A minimum of 3 staff members must be added for this section to be
            displayed on the facility page. A maximum of 6 staff members can be
            added.
          </p>
        )}
        {activeSection === "meetTheTeam" && (
          <TeamMemberList
            facilitySlug={facilitySlug}
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
            onPendingAdd={onPendingAdd}
            onPendingRemove={onPendingRemove}
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

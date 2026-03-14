"use client";

import TeamMemberList from "@/_components/user/dashboard/facilities/edit-form/team-member-list";
import { TeamMember } from "@/_types/facility-types";

interface Props {
  facilitySlug: string;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function MeetTheTeamSection({
  facilitySlug,
  teamMembers,
  setTeamMembers,
  activeSection,
  toggleSection,
}: Props) {
  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("meetTheTeam")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">Meet the Team (optional)</span>
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
}

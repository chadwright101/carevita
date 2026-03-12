"use client";

import ImageUploader from "@/_components/user/dashboard/image-uploader";
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
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border border-black rounded p-3"
            >
              <label className="flex flex-col gap-1">
                <span className="text-smallest">Position</span>
                <input
                  value={member.position}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, j) =>
                        j === i ? { ...m, position: e.target.value } : m
                      )
                    )
                  }
                  className="border border-black rounded p-2"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-smallest">Team Member Name</span>
                <input
                  value={member.teamMember}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, j) =>
                        j === i ? { ...m, teamMember: e.target.value } : m
                      )
                    )
                  }
                  className="border border-black rounded p-2"
                />
              </label>
              <div className="flex flex-col gap-1">
                <span className="text-smallest">Image</span>
                <ImageUploader
                  storagePath={`facilities/${facilitySlug}/team`}
                  onUploaded={(url) =>
                    setTeamMembers((prev) =>
                      prev.map((m, j) => (j === i ? { ...m, url } : m))
                    )
                  }
                  currentUrl={member.url}
                  showPreview
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setTeamMembers((prev) => prev.filter((_, j) => j !== i))
                }
                className="desktop:hover:cursor-pointer self-start"
              >
                Remove Member
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setTeamMembers((prev) => [
                ...prev,
                { position: "", url: "", teamMember: "" },
              ])
            }
            className="desktop:hover:cursor-pointer self-start"
          >
            Add Team Member
          </button>
        </div>
      )}
      <input
        type="hidden"
        name="meetTheTeam"
        value={JSON.stringify(teamMembers)}
      />
    </div>
  );
}

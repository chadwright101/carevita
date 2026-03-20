"use client";

import { useState } from "react";
import classNames from "classnames";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ReorderButtons from "@/_components/user/dashboard/reorder-buttons";
import { TeamMember } from "@/_types/facility-types";
import { X } from "lucide-react";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  facilitySlug: string;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}

export default function TeamMemberList({
  facilitySlug,
  teamMembers,
  setTeamMembers,
}: Props) {
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  return (
    <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-10 px-5 py-7 border-t border-black">
      {teamMembers.map((member, i) => (
        <div
          key={i}
          className="flex flex-col gap-5 border border-black/25 p-5 rounded"
        >
          {confirmIndex === i && (
            <p className="text-smaller text-error">
              Are you sure you want to delete this team member?
            </p>
          )}
          <div className="grid phone:grid-cols-[1fr_80px] gap-5">
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-1">
                <span className="font-semibold">Team Member Name</span>
                <input
                  value={member.teamMember}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, j) =>
                        j === i ? { ...m, teamMember: e.target.value } : m,
                      ),
                    )
                  }
                  className="border border-black rounded p-2"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-semibold">Position</span>
                <input
                  value={member.position}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, j) =>
                        j === i ? { ...m, position: e.target.value } : m,
                      ),
                    )
                  }
                  className="border border-black rounded p-2"
                />
              </label>
            </div>
            <div className="flex flex-row-reverse order-first gap-2 justify-between phone:justify-start phone:flex-col phone:items-end phone:order-last">
              {confirmIndex === i && (
                <button
                  type="button"
                  onClick={() => setConfirmIndex(null)}
                  className="p-2 rounded desktop:hover:cursor-pointer ease-in-out duration-300 desktop:hover:opacity-80 bg-black/25"
                >
                  <span className="text-white text-smallest font-semibold">
                    Cancel
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (confirmIndex === i) {
                    setTeamMembers((prev) => prev.filter((_, j) => j !== i));
                    setConfirmIndex(null);
                  } else {
                    setConfirmIndex(i);
                  }
                }}
                className={classNames(
                  "rounded desktop:hover:cursor-pointer desktop:hover:opacity-80 transition-opacity duration-300",
                  confirmIndex === i ? "bg-error p-2" : "bg-error/75 p-4",
                )}
              >
                {confirmIndex === i ? (
                  <span className="text-white text-smallest font-semibold">
                    Confirm
                  </span>
                ) : (
                  <X color="#ffffff" size={20} />
                )}
              </button>
              {confirmIndex !== i && (
                <ReorderButtons
                  index={i}
                  total={teamMembers.length}
                  onMove={(direction) =>
                    setTeamMembers((prev) => {
                      const next = [...prev];
                      const target = i + direction;
                      [next[i], next[target]] = [next[target], next[i]];
                      return next;
                    })
                  }
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold">Image</span>
            <MediaUploader
              storagePath={`facilities/${facilitySlug}/team`}
              onUploaded={(url) =>
                setTeamMembers((prev) =>
                  prev.map((m, j) => (j === i ? { ...m, url } : m)),
                )
              }
              currentUrl={member.url}
              showPreview
            />
          </div>
        </div>
      ))}
      <ButtonType
        type="button"
        backgroundColor="blue"
        cssClasses="mr-auto self-center"
        onClick={() =>
          setTeamMembers((prev) => [
            ...prev,
            { position: "", url: "", teamMember: "" },
          ])
        }
      >
        Add Team Member
      </ButtonType>
    </div>
  );
}

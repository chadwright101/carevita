interface Props {
  title: string;
  setTitle: (v: string) => void;
  extendedTitle: string;
  setExtendedTitle: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  region: "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC";
  setRegion: (v: "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC") => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function GeneralSection({
  title,
  setTitle,
  extendedTitle,
  setExtendedTitle,
  city,
  setCity,
  region,
  setRegion,
  email,
  setEmail,
  phone,
  setPhone,
  activeSection,
  toggleSection,
}: Props) {
  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("general")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">General</span>
        <span>{activeSection === "general" ? "−" : "+"}</span>
      </button>
      {activeSection === "general" && (
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Facility Name</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">
                Facility Extended Name (optional)
              </span>
              <input
                value={extendedTitle}
                onChange={(e) => setExtendedTitle(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">City/Town</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Province</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as "EC" | "FS" | "GP" | "KZN" | "LP" | "MP" | "NC" | "NW" | "WC")}
                className="border border-black rounded p-2 desktop:hover:cursor-pointer"
              >
                <option value="EC">Eastern Cape</option>
                <option value="FS">Free State</option>
                <option value="GP">Gauteng</option>
                <option value="KZN">KwaZulu-Natal</option>
                <option value="LP">Limpopo</option>
                <option value="MP">Mpumalanga</option>
                <option value="NW">North West</option>
                <option value="NC">Northern Cape</option>
                <option value="WC">Western Cape</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Facility Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Facility Phone</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
          </div>
        </div>
      )}
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="extendedTitle" value={extendedTitle} />
      <input type="hidden" name="city" value={city} />
      <input type="hidden" name="region" value={region} />
      <input type="hidden" name="facilityEmail" value={email} />
      <input type="hidden" name="facilityPhone" value={phone} />
    </div>
  );
}

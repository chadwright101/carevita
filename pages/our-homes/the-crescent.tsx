import IndividualHomesPageItem from "@/components/individual-homes-pages/individualHomesPageItem";

import pageList from "../../data/carevita-data.json";

const TheCrescent = () => {
  return <IndividualHomesPageItem homeList={pageList.crescentPage} />;
};

export default TheCrescent;

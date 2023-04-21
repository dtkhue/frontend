import * as XLSX from "xlsx";
import { cloneDeep } from "lodash";
import Image from "next/image";

import ExportIcon from "@/statics/button/buttonExport.svg";

interface Props {
  data: any;
  titleButton?: string;
  styles?: object;
  className?: string;
  styleTitle?: string;
}

export const ButtonDownload: React.FC<Props> = ({
  data,
  titleButton = "Export",
  styles,
  className,
  styleTitle,
}: {
  data: Array<any>;
  titleButton?: string;
  styles?: object;
  className?: string;
  styleTitle?: string;
}) => {
  const handleExport = () => {
    try {
      let dataToExport = cloneDeep(data);

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      XLSX.writeFile(wb, "Data.xlsx");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className={`d-flex items-center gap-1 outline-0 border-1 pr-3 pl-3 rounded-sm 
      ${className}`}
      style={{
        boxShadow: "0 4px 4px rgba(0,0,0,0.08)",
        borderRadius: "4px",
        ...styles,
      }}
    >
      <Image src={ExportIcon} alt="icon export" />
      <span className={`cursor-pointer text-sm ${styleTitle}`}>
        {titleButton}
      </span>
    </button>
  );
};

import type { NextPage } from "next";
import Editor  from "@/components/Editor";


export const mainKey = 'name';
export const subject = 'combination';
export const referenceField = {
  "id": 1,
  "name": "",
  "combinationTypeId": "",
  "combinationSubjectId": ""
}


export const title = "Jogos possíveis (tipo de jogo)"
export type Subject = "deck" | "card" | "user" | "combination-subject" | "combination-type" | "combination-info" | "combination" | "analysis";
interface IForgeignData {
  shouldDownload: Subject;
  replaceKeyReq: string;
  replaceKeyRes: string;
}

export const foreignData: IForgeignData[] = [
  {
    shouldDownload: "combination-type",
    replaceKeyReq: "combinationTypeId",
    replaceKeyRes: "description"
  },
  {
    shouldDownload: "combination-subject",
    replaceKeyReq: "combinationSubjectId",
    replaceKeyRes: "description"
  },
]

const Combination: NextPage = (props) => {

  return (
    <Editor 
      referenceField={referenceField}
      mainKey={mainKey}
      subject={subject}
      title={title}
      helperKeys={foreignData}
    />
  )
}

export default Combination
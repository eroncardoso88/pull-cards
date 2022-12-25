import type { NextPage } from "next";
import Editor  from "@/components/Editor";


export const mainKey = 'cardSequenceList';
export const subject = 'combination-info';
export const referenceField = {
  "id": 1,
  "cardSequenceList": "",
  "combinationId": ""
}

export const title = "O Jogo: jogo a ser analisado. Casamento de jogos que saem X perguntas"
export type Subject = "deck" | "card" | "user" | "combination-subject" | "combination-type" | "combination-info" | "combination" | "analysis";
interface IForgeignData {
  shouldDownload: Subject;
  replaceKeyReq: string;
  replaceKeyRes: string;
  isMultiSelect?: true
  extraValue?: string;
}

export const foreignData: IForgeignData[] = [
  {
    shouldDownload: "card",
    replaceKeyReq: "cardSequenceList",
    replaceKeyRes: "name",
    isMultiSelect: true,
    extraValue: "info"
  },
  {
    shouldDownload: "combination",
    replaceKeyReq: "combinationId",
    replaceKeyRes: "name"
  },
]

const CombinationInfo: NextPage = (props) => {

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

export default CombinationInfo
import type { NextPage } from "next";
import Editor  from "@/components/Editor";


export const mainKey = 'textOne';
export const subject = 'analysis';
export const referenceField = {
  "id": 1,
  "authorId": "",
  "createdAt": "",
  "combinationInfoId": "",
  "textOne": "",
  "textTwo": "",
  "textThree": "",
  "textFour": ""
}

export const title = "Possibilidades de quantidades de cartas tiradas para o jogo"
export type Subject = "deck" | "card" | "user" | "combination-subject" | "combination-type" | "combination-info" | "combination" | "analysis";
interface IForgeignData {
  shouldDownload: Subject;
  replaceKeyReq: string;
  replaceKeyRes: string;
}

export const foreignData: IForgeignData[] = [
  {
    shouldDownload: "combination-info",
    replaceKeyReq: "combinationInfoId",
    replaceKeyRes: "cardSequenceList"
  },
]

const Analysis: NextPage = (props) => {

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

export default Analysis
export type UpdateComplaintParamsType = {
  visibility: number;
  status: number;
  importance: number;
};
export type UpdateComplaintPayload ={
  Id: string;
  updatedData: Partial<Omit<UpdateComplaintParamsType, "Id">>;
}
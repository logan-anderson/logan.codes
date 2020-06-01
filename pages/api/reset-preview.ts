export default (_req: any, res: any) => {
  res.clearPreviewData()
  res.status(200).end()
}

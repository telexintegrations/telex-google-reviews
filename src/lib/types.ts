export type TickRequest = {
  channel_id: "string";
  return_url: "string";
  settings: [
    {
      label: "business-1";
      type: "text";
      required: true;
      default: "";
    }
  ];
};

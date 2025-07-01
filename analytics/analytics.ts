import posthog from "posthog-js";

export const sendExportPDFEvent = () => {
  posthog.capture("export_pdf");
};

export const sendSaveDraftEvent = () => {
  posthog.capture("save_draft");
};

export const sendLoadDraftEvent = () => {
  posthog.capture("load_draft");
};

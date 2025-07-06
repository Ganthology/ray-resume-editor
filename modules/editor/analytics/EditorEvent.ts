import posthog from "posthog-js";

export class EditorEvent {
  static sendExportPDFEvent = () => {
    posthog.capture("export_pdf");
  };

  static sendSaveDraftEvent = () => {
    posthog.capture("save_draft");
  };

  static sendLoadDraftEvent = () => {
    posthog.capture("load_draft");
  };
}

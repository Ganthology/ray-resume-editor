import posthog from "posthog-js";

export class LandingEvent {
  static sendHeroSectionInteractionEvent = (
    interaction: "create_resume" | "chat_to_build"
  ) => {
    posthog.capture("hero_section_interaction", { interaction });
  };

  static sendPricingSectionInteractionEvent = (
    interaction: "get_started_free" | "get_started_lite" | "get_started_pro"
  ) => {
    posthog.capture("pricing_section_interaction", { interaction });
  };

  static sendFooterInteractionEvent = (
    interaction: "get_started_free" | "get_started_lite" | "get_started_pro"
  ) => {
    posthog.capture("footer_interaction", { interaction });
  };

  static sendNavigationInteractionEvent = (
    interaction: "get_started_free" | "get_started_lite" | "get_started_pro"
  ) => {
    posthog.capture("navigation_interaction", { interaction });
  };
}

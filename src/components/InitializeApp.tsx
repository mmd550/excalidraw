import React, { useCallback, useEffect, useState } from "react";

import { LoadingMessage } from "./LoadingMessage";
import {
  CustomLanguage,
  defaultLang,
  Language,
  languages,
  setLanguage,
} from "../i18n";
import { Theme } from "../element/types";

interface Props {
  langCode: Language["code"];
  customLanguages?: CustomLanguage[];
  children: React.ReactElement;
  theme?: Theme;
}

export const InitializeApp = (props: Props) => {
  const [loading, setLoading] = useState(true);

  const updateLanguage = useCallback(async () => {
    const currentCustomLang = props.customLanguages?.find(
      (lang) => lang.code === props.langCode,
    );
    const currentLang =
      languages.find((lang) => lang.code === props.langCode) || defaultLang;

    setLoading(true);
    await setLanguage(currentLang, currentCustomLang);
    setLoading(false);
  }, [props.customLanguages, props.langCode]);

  useEffect(() => {
    updateLanguage();
  }, [updateLanguage]);

  useEffect(() => {
    props.customLanguages?.forEach((customLanguage) => {
      const index = languages.findIndex((l) => l.code === customLanguage.code);
      if (index !== -1) {
        languages[index] = customLanguage;
      } else {
        languages.push(customLanguage);
      }
    });
  }, [props.customLanguages]);

  return loading ? <LoadingMessage theme={props.theme} /> : props.children;
};

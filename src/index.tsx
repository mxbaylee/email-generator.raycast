#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title 💌 Email
// @raycast.mode compact

// Optional parameters:
// @raycast.icon assets/icon.png
// @raycast.packageName Email Generator

// Documentation:
// @raycast.description Generate dynamic email addresses for registration.
// @raycast.author jnnarudbnojmtq
// @raycast.authorURL https://raycast.com/jnnarudbnojmtq

import {
  Action,
  ActionPanel,
  BrowserExtension,
  Color,
  getPreferenceValues,
  Icon,
  List,
  showToast,
  Toast,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { generateRandomHex, getName } from "./util";

interface Preferences {
  emailDomain: string;
}

export default function Command() {
  const { emailDomain }  = getPreferenceValues<Preferences>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeDomain, setActiveDomain] = useState<string>();
  const [error, setError] = useState<string|false>(false);

  useEffect(() => {
    if (error) {
      showToast({
        style: Toast.Style.Failure,
        title: error,
      });
      setError(false);
    } else if (!activeDomain) {
      showToast({
        style: Toast.Style.Failure,
        title: 'Failed to parse active tab.',
      });
    }
  }, [error, activeDomain]);

  useEffect(() => {
    if (activeDomain) return;
    BrowserExtension.getTabs().then((tabs) => {
      setIsLoading(false);
      const activeTab = tabs.find((tab) => tab.active);
      if (activeTab) {
        setActiveDomain(getName(activeTab.url));
      } else {
        setError('No active tab found');
      }
    });
  }, []);

  return (
    <List
      isLoading={isLoading}
      filtering={false}
    >
      { [6, 11, 16].map((length: number) => {
        const emailAddress = `${activeDomain}.${generateRandomHex(length)}@${emailDomain}`;
        return (
          <List.Item
            icon={Icon.Envelope}
            key={length}
            title={emailAddress}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copy Email Address" content={emailAddress} />
              </ActionPanel>
            }
            accessories={[
              {
                icon: Icon.CopyClipboard,
                tag: {
                  value: `${length}`,
                  color: Color.Magenta
                }
              },
            ]}
          />
        );
      })}
    </List>
  );
}

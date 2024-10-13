"use client";
import { Image, Accordion, Grid, Title } from "@mantine/core";
import classes from "./Faqs.module.css";

export default function Faqs() {
  const accordionClass =
    "border-hover hover:border-yellow-400 focus:border-yellow-400";

  return (
    <div className="">
      <div className="lg:pt-22 pt-12 lg:flex lg:w-screen lg:justify-center">
        <Grid id="faq-grid" gutter={50} className="lg:w-[1200px]">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src="/images/faqs.svg" alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={1} ta="left" className={`${classes.title} text-2xl`}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              variant="separated"
              transitionDuration={500}
            >
              <Accordion.Item
                className={`${classes.item} ${accordionClass}`}
                value="working"
              >
                <Accordion.Control>How does Zerokoin work?</Accordion.Control>
                <Accordion.Panel>
                  Zerokoin simplifies the process of buying or selling crypto
                  using M-Pesa by intergrating with M-Pesa, Paystack, and smart
                  wallets APIs to offer automated swaps.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item
                className={`${classes.item} ${accordionClass}`}
                value="supported-crypto"
              >
                <Accordion.Control>
                  What cryptocurrencies can I access on Zerokoin?
                </Accordion.Control>
                <Accordion.Panel>
                  At the moment, Zerokoin primarily supports stablecoins for
                  trading. However, we&apos;re continuously exploring
                  opportunities to expand our offerings to include a broader
                  range of tokens in the future. Stay tuned for updates as we
                  work towards enhancing our platform to accommodate additional
                  cryptocurrencies for your trading needs.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item
                className={`${classes.item} ${accordionClass}`}
                value="base-names"
              >
                <Accordion.Control>
                  What are Basenames and how can I uses them
                </Accordion.Control>
                <Accordion.Panel>
                  On the Base blockchain, basenames are simplified identifiers
                  like human-readable names for wallet addresses or tokenized
                  assets. They enhance user experience by replacing complex
                  cryptographic strings with easy-to-remember names, such as ENS
                  domains (yourname.base.eth) for Ethereum addresses.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item
                className={`${classes.item} ${accordionClass}`}
                value="smart-wallets"
              >
                <Accordion.Control>What are smart wallets?</Accordion.Control>
                <Accordion.Panel>
                  A smart wallet is an upgraded crypto wallet that uses smart
                  contracts to offer advanced features like multi-signature
                  security, spending limits, and recovery options. Unlike
                  traditional wallets (EOAs), which rely on a single private
                  key, smart wallets provide more control, automation, and
                  flexibility. While EOAs are simpler with lower fees, smart
                  wallets give you enhanced security and peace of mind. Take
                  charge of your crypto with smart wallets—your funds, your
                  rules!
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item
                className={`${classes.item} ${accordionClass}`}
                value="gasless-transactions"
              >
                <Accordion.Control>
                  What are gasless transactions?
                </Accordion.Control>
                <Accordion.Panel>
                  Gasless transactions let you interact with the blockchain
                  without paying fees—these are covered by a third party or
                  smart contract. Unlike traditional transactions that require
                  gas fees, gasless transactions offer a smoother, more
                  user-friendly experience. Enjoy the freedom of fee-free
                  blockchain interactions with gasless transactions!
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}

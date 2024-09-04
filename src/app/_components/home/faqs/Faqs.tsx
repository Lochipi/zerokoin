"use client";
import { Image, Accordion, Grid, Title } from "@mantine/core";
import classes from "./Faqs.module.css";

export default function Faqs() {
  const accordionClass = "border-hover hover:border-yellow-400 focus:border-yellow-400";

  return (
    <div className="">
      <div className="lg:flex lg:justify-center lg:w-screen pt-12 lg:pt-22">
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
              <Accordion.Item className={`${classes.item} ${accordionClass}`} value="working">
                <Accordion.Control>How does Zerokoin work?</Accordion.Control>
                <Accordion.Panel>
                  Zerokoin simplifies the process of buying or selling crypto
                  using M-Pesa by intergrating with M-Pesa, Binance, and web
                  wallets APIs to offer automated swaps.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={`${classes.item} ${accordionClass}`} value="supported-crypto">
                <Accordion.Control>
                  What cryptocurrencies can I trade on Zerokoin?
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
              <Accordion.Item className={`${classes.item} ${accordionClass}`} value="fees">
                <Accordion.Control>
                  Are there any hidden fees on Zerokoin?
                </Accordion.Control>
                <Accordion.Panel>
                  No, Zerokoin is committed to transparency when it comes to
                  fees. We offer competitive rates closely aligned with the
                  current USD/KES exchange rate, ensuring that users have full
                  visibility into the costs of their transactions. There are no
                  hidden fees – what you see is what you get.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item className={`${classes.item} ${accordionClass}`} value="kyc">
                <Accordion.Control>
                  Do I need to complete KYC to use Zerokoin ?
                </Accordion.Control>
                <Accordion.Panel>
                  For users using our Binance intergration, KYC (Know Your
                  Customer) requirements are handled by Binance and M-Pesa,
                  meaning there&apos;s no need for additional KYC when using
                  Zerokoin. However, for users with self-custodial wallets,
                  minimal KYC is required to ensure compliance with regulatory
                  standards and enhance security measures. Rest assured,
                  Zerokoin aims to keep the KYC process as streamlined and
                  user-friendly as possible while prioritizing the safety and
                  security of all transactions.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item
                className={`${classes.item} ${accordionClass}`}
                value="failed-transactions"
              >
                <Accordion.Control>
                  What happens if there&apos;s an issue with my transaction?
                </Accordion.Control>
                <Accordion.Panel>
                  In the rare event of an issue with your transaction, our
                  customer support team is here to assist you. Simply reach out
                  to us via our active communications channels, and we&apos;ll
                  work diligently to resolve any issues and ensure that your
                  transaction is completed successfully.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}

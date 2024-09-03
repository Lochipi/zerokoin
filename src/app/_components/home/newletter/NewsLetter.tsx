import { Text, Title, TextInput, Button, Image } from "@mantine/core";
import classes from "./NewsLetter.module.css";

export function NewsLetter() {
  return (
    <div className=" py-16">
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>Newsletter</Title>
          <Text fw={500} fz="lg" mb={5}>
            Stay in the Loop with Zerokoin&apos;s Newsletter
          </Text>
          <Text fz="sm" c="dimmed">
            Subscribe to our newsletter to get notified when we launch ,updates,
            news, and insights straight to your inbox. Stay informed about new
            features, promotions, and industry trends .
          </Text>

          <div className={classes.controls}>
            <TextInput
              placeholder="Your email"
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            />
            <Button className={classes.control}>Subscribe</Button>
          </div>
        </div>
        <Image
          src="/images/newletter-banner.svg"
          className={classes.image}
          alt="newletter-banner"
        />
      </div>
    </div>
  );
}

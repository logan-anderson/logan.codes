import { PropsWithChildren } from "react";

export const SectionHeader = ({ children }: PropsWithChildren) => {
  return (
    <h2 className="font-bold tracking-widest text-sm text-gray-800 print:tracking-normal">
      {children}
    </h2>
  );
};

export const BulletListItem = ({ children }: PropsWithChildren) => {
  return (
    <li className="mt-2.1 ml-4 text-base text-gray-700 leading-normal list-disc">
      {children}
    </li>
  );
};

export const SkillLink = (props: { label: string; url: string }) => {
  return (
    <a
      href={props.url}
      target="_blank"
      className="cursor-pointer active:bg-[#cacfd1] hover:underline"
    >
      {props.label}
    </a>
  );
};

export const SkillList = ({
  skills,
}: {
  skills: { label: string; url?: string }[];
}) => {
  return (
    <ul className="flex flex-wrap text-base leading-relaxed -mr-1.6 -mb-1.6">
      {skills.map((skill) => {
        return (
          <li className="[word-wrap: break-word] my-1 mr-1 flex h-6 items-center justify-between rounded-[16px] bg-gray-200 px-2 py-0 text-sm font-normal normal-case leading-loose text-gray-800 shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none  print:text-xs print:h-4 print:my-[2px] print:mr-[2px] ">
            {skill.url ? (
              <SkillLink label={skill.label} url={skill.url} />
            ) : (
              skill.label
            )}
          </li>
        );
      })}
    </ul>
  );
};
export const ExternalLink: React.FC<{
  href: string;
  children: string | JSX.Element | JSX.Element[] | string[];
}> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" className="text-blue-600 hover:underline">
      {children}
    </a>
  );
};
export const LinkHeading: React.FC<
  {
    href: string;
  } & PropsWithChildren
> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" className="hover:underline text-blue-500">
      <Heading>{children} </Heading>
    </a>
  );
};
export const Heading: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold leading-5 my-2 print:my-05 text-blue-500 print:text-lg/5">
      {children}
    </h3>
  );
};

export const Bold: React.FC<{
  children: string | JSX.Element | JSX.Element[] | string[];
}> = ({ children }) => {
  return <strong className="font-semibold text-blue-950"> {children} </strong>;
};

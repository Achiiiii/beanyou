import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export const queryRelaxEvents = () => {
  const { result, onResult } = useQuery(
    gql`
      query RelaxEvents {
        relaxEvents {
          uuid
          iconUrl
          activeIconUrl
          title
          screenUrl
          introText
          link1Title
          link1Url
          link2Title
          link2Url
          index
          createdAt
          updatedAt
        }
      }
    `
  );
  return { result, onResult };
};

export const queryPsychologists = () => {
  const { result, onResult } = useQuery(gql`
    query Psychologists {
      psychologists {
        uuid
        title
        photoUrl
        position
        experience
        education
        specialty
        linkUrl
        index
        createdAt
        updatedAt
      }
    }
  `);
  return { result, onResult };
};

export const queryClinics = () => {
  const { result, onResult } = useQuery(gql`
    query Clinics {
      medicalUnits {
        uuid
        name
        photoUrl
        address
        phone
        websiteLink
        index
        createdAt
        updatedAt
      }
    }
  `);
  return { result, onResult };
};

export const queryToken = (
  username: string,
  password: string,
  appUuid = '3c0b2ab3-f410-4132-8395-4b86f0fc0ea5'
) => {
  const { result, onResult, refetch } = useQuery(
    gql`
      query token($appUuid: String!, $username: String!, $password: String!) {
        token(appUuid: $appUuid, username: $username, password: $password) {
          data
        }
      }
    `,
    {
      username,
      password,
      appUuid,
    }
  );
  return { result, onResult, refetch };
};

export const mutateCreateUser = () => {
  const { mutate, onDone, onError } = useMutation(
    gql`
      mutation mutateCreateUser($userCreateInput: UserCreateInput!) {
        createUser(userCreateInput: $userCreateInput) {
          ok
          user {
            uuid
            lineUserId
            createdAt
            updatedAt
          }
        }
      }
    `
  );
  return { mutate, onDone, onError };
};

export const queryScore = (
  fromDate: string,
  toDate: string,
  client: object
) => {
  const { result, onResult, refetch, onError } = useQuery(
    gql`
      query queryScore($fromDate: Date!, $toDate: Date!) {
        emotionalScoreRecords(fromDate: $fromDate, toDate: $toDate) {
          uuid
          userUuid
          recordDate
          score
          createdAt
          updatedAt
        }
      }
    `,
    {
      fromDate,
      toDate,
    },
    client
  );
  return { result, onResult, refetch, onError };
};

export const mutateScore = () => {
  const { mutate, onDone, onError } = useMutation(
    gql`
      mutation mutateScore(
        $emotionalScoreRecordUpdateInput: EmotionalScoreRecordUpdateInput!
      ) {
        updateEmotionalScoreRecord(
          emotionalScoreRecordUpdateInput: $emotionalScoreRecordUpdateInput
        ) {
          ok
          emotionalScoreRecord {
            uuid
            userUuid
            recordDate
            score
            createdAt
            updatedAt
          }
        }
      }
    `,
    { clientId: 'clientA' }
  );
  return { mutate, onDone, onError };
};

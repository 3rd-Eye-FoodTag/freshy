import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import UnstyleButton from '../../../../components/UnstyleButton';
import DateDropDown from '../../../../components/DateDropDown';
import {daysCollection, generateTimeOptions} from '@/utils/utils';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useSelector} from 'react-redux';
import {currentUser} from '@/redux/reducer';
import {putUpdateWeeklyWrapTime} from '@/utils/routes';

const WeeklyWrapUpTimeScreen = () => {
  const currentUserUUID = useSelector(currentUser);
  const queryClient = useQueryClient();

  const {data: userData = []} = useQuery<any>({
    queryKey: ['fetchUserInfo', currentUserUUID],
  });

  const [days, setDays] = useState(
    userData?.setting?.weeklyWrapTime?.Days || 'Monday',
  );
  const [times, setTimes] = useState(
    userData?.setting?.weeklyWrapTime?.Times || '12:00 AM',
  );

  useEffect(() => {
    if (userData && userData?.setting) {
      const weeklyWraptime = userData?.setting.weeklyWrapTime;
      if (weeklyWraptime?.Days && weeklyWraptime?.Times) {
        setTimes(weeklyWraptime?.Times);
        setDays(weeklyWraptime?.Days);
      }
    }
  }, [userData]);

  const {
    mutate: handleWeeklyWrap,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async () =>
      putUpdateWeeklyWrapTime({Days: days, Times: times}, currentUserUUID),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchUserInfo', currentUserUUID],
      });
    },
  });

  const handleSaveWeeklylWrapTime = async () => {
    handleWeeklyWrap();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-[10%]" />
      <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
        We will let you see what’s expiring, plan meals and generate grocery
        list.
      </Text>
      <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
        When is a good time for your wrap up?
      </Text>
      {days && times && (
        <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
          {days} {times}
        </Text>
      )}
      {isSuccess && (
        <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
          Successfully to change the time
        </Text>
      )}
      {isError && (
        <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
          Fail to change the time
        </Text>
      )}
      <View className="flex-row justify-between w-[90%] mb-[20%] mx-auto">
        <DateDropDown
          options={daysCollection}
          placeholder="Firday"
          containerStyle={{width: '45%'}}
          dropdownOptionsStyle={{left: -35, right: -225}}
          onSelected={day => {
            setDays(day);
          }}
          defaultOption={userData?.setting?.weeklyWrapTime?.Days}
        />
        <DateDropDown
          options={generateTimeOptions()}
          placeholder="8:00 PM"
          containerStyle={{width: '45%'}}
          dropdownOptionsStyle={{left: -235, right: -30}}
          onSelected={time => {
            setTimes(time);
          }}
          defaultOption={userData?.setting?.weeklyWrapTime?.Times}
        />
      </View>
      <UnstyleButton
        text="Continue"
        backgroundColor="rgb(81, 179, 125)"
        onPress={handleSaveWeeklylWrapTime}
        style={{alignSelf: 'center', zIndex: -1}}
      />
    </SafeAreaView>
  );
};

export default WeeklyWrapUpTimeScreen;

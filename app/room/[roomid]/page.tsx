'use client';
import { useRouter } from 'next/navigation';

import useUser from '@/app/hooks/useUser';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 as uuid } from 'uuid';

function Room({ params }: { params: { roomid: string } }) {
  const { fullName } = useUser();
  const roomID = params.roomid;
  const router = useRouter();

  let myMeeting: any = async (element: any) => {
    // generate Kit Token
    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      uuid(),
      fullName || 'user' + Date.now(),
      720
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Meeting URL',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      maxUsers: 4,
      showRoomTimer: true,
      onReturnToHomeScreenClicked: () => {
        return router.push('/');
      },
    });
  };

  return (
    <div
      className="w-full h-screen"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

export default Room;

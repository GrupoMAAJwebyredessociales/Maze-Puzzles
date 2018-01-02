using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Brujula : MonoBehaviour {
	public Vector3 NorthDir;
	public Transform Player;
	public RectTransform North;
	public Quaternion MissionDir;
	public RectTransform Mission;
	private Transform missionplace;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		getPieces ();
		ChangeNorthDirection ();
		ChangeMissionDirection ();

	}
	void ChangeNorthDirection() {
		NorthDir.z = Player.eulerAngles.y;
		North.localEulerAngles = NorthDir;

	}
	void ChangeMissionDirection(){
		Vector3 dir = transform.position - missionplace.position;
		MissionDir = Quaternion.LookRotation (dir);
		MissionDir.z = -MissionDir.y;
		MissionDir.x = 0;
		MissionDir.y = 0;
		Mission.localRotation = MissionDir * Quaternion.Euler (NorthDir);
	}
    Transform GetClosestTarget (Transform[] targets)
    {
        Transform bestTarget = null;
        float closestDistanceSqr = Mathf.Infinity;
        Vector3 currentPosition = transform.position;
        foreach(Transform potentialTarget in targets)
        {
            Vector3 directionToTarget = potentialTarget.position - currentPosition;
            float dSqrToTarget = directionToTarget.sqrMagnitude;
            if(dSqrToTarget < closestDistanceSqr)
            {
                closestDistanceSqr = dSqrToTarget;
                bestTarget = potentialTarget;
            }
        }
     
        return bestTarget;
    }
	void getPieces(){
		GameObject []pieces;
		pieces = GameObject.FindGameObjectsWithTag ("pieces");
		int size = 0;
		for (int i = 0; i < pieces.Length; i++) {
			if (pieces [i].gameObject.activeSelf) {
				size++;
			}
		}
		//print (size);
		Transform[] trans = new Transform[size];
		for (int i = 0; i < trans.Length; i++) {
			if (pieces [i].gameObject.activeSelf) {
				
				trans [i] = pieces [i].transform; 
			}
		}
		missionplace = GetClosestTarget (trans);
	}
}
